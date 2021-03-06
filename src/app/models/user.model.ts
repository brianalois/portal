import { Model, Col }            from 'browser-orm';
// import { Model, Col }            from './model';
import * as _               from 'underscore';
import { LoginOptions }     from 'ngx-facebook';
import { Company }          from './company.model';
import * as jwt_decode      from 'jwt-decode';
//interfaces
import { LoginInfo }        from './../interfaces/login-info';
import { API }              from './../helpers/api.helper';
import { Util }             from './../helpers/util.helper';
declare var googleyolo: any;

export class User extends Model {
  apiUpdateValues:Array<string> = ['email', 'phone', 'first', 'last'];//these are the values that will be sent to the API

  @Col({primary:true})
  id:number;
  @Col()
  first:string;
  @Col()
  last:string;
  @Col()
  auth:boolean;
  @Col()
  token:string;
  @Col()
  email:string;
  @Col()
  phone:string;
  @Col()
  role:string;
  @Col()
  kind:string;
  @Col()
  permissions:Array<{name:string}>;

  constructor(obj:object){
    super(obj);
  }

  set full_name(name:string){
    if(name){
      let split = name.split(' ');
      this.first = split[0];
      if(split[1]) this.last = split[1];
    }else{
      this.first = '';
      this.last = '';
    }
  }

  get full_name(){
    let full_name = '';
    if(this.first) full_name = `${this.first}`;
    if(this.last) full_name = `${full_name} ${this.last}`;
    return full_name;
  }


  logout(){
    this.remove();
    localStorage.clear();//remove all data in storage
    Util.route('/home');
    this.emit(['logout', 'auth'], 'logout', true);
  }

  async saveAPI(){
    return API.save(this, '/v1/users');
  }

  Companies(pull?:boolean){
    if(pull) this.static.getAllAuthCompanies();

    return this.belongsToMany(Company, 'users.user_id', 'id');
  }

  to(action){
    return Util.route('/user/'+action);
  }

  parseToken(){
    return jwt_decode(this.token);
  }

  //************************************
  //********* STATIC METHODS ***********
  //************************************


  static get fb(){
    // return Util.fb;
    return {};
  }

  static Auth(){//Grabs currently authenticated user
    let user:User = <User> this.findOne({auth:true});
    if(user){
      let parse = user.parseToken();

      let cur_time_date = new Date();
      let cur_time = cur_time_date.getTime()/1000;

      if(cur_time>=parse.exp){//get the users token expiration time if it is up log them out
        user.logout()
        return null;
      }
    }

    return user;
  }

  static async getAllAuthCompanies(){
    let err, res;
    [err, res] = await Util.to(Util.get('/v1/companies'));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let companies = []
    for(let i in res.companies){
      let company_info = res.companies[i];
      let company = Company.resCreate(company_info);
      companies.push(company);
    }

    return companies;
  }

  static Login(info: LoginInfo){

    let user_info:any = info.user;

    user_info.auth  = true;
    user_info.token = info.token;

    let user = <User> User.create(user_info);
    user.emit(['login', 'auth'], 'login', true);
    return user;
  }

  static async LoginReg(data: Object){
    let res:any;
    let err;
    [err, res] = await Util.to(Util.post('/v1/users/login', data));

    if(err) Util.TE(err, true);

    if(!res.success) Util.TE(res.error, true);

    var login_info: LoginInfo = {
      token: res.token,
      user: res.user,
    };

    let user = this.Login(login_info);
    return user;
  }

  static async CreateAccount(data:Object){
    let err, res:any;
    [err, res] = await Util.to(Util.post('/v1/users', data));

    if(err) Util.TE(err, true);
    if(!res.success) Util.TE(res.error, true);

    var login_info: LoginInfo = {
      token: res.token,
      user: res.user,
    };

    let user = this.Login(login_info);
    return user;
  }

  static async LoginSocial(service: String){
    let err, res, opts;
    let login_info: LoginInfo;
    switch(service){
      case 'facebook':
        // const scopes = 'public_profile,user_friends,email,pages_show_list';
        const scopes = 'public_profile,user_friends,email,user_birthday';
        const loginOptions: LoginOptions = {
          enable_profile_selector: true,
          return_scopes: true,
          scope: scopes
        };
        [err, res] = await Util.to(Util.FB.login(loginOptions));

        let a_res = res.authResponse;
        [err, res] = await Util.to(Util.FB.api('/me'+'?fields=id,name,picture,email,birthday,gender,age_range,devices,location,first_name,last_name,website'));

        console.log('err', err, 'res', res);
        [err ,res] = await Util.to(Util.post('/v1/users/login/facebook', {auth_response:a_res, user_info:res}));


        break;
      case  'google':

        opts = {
          supportedAuthMethods: ["https://accounts.google.com"],
          supportedIdTokenProviders: [{
            uri: "https://accounts.google.com",
            clientId: Util.env.vari.googel_app_id,
          }]
        };

        [err, res] = await Util.to(googleyolo.hint(opts));
        if(err) Util.TE('Error loggin in user with google.');
        if(!res.idToken) Util.TE('Could not get idToken from google');


        [err, res] = await Util.to(Util.post('/v1/users/login/google', {token:res.idToken}))

        break;
      default:
        err = 'no auth login service selected';
        break;
    }

    if(res.success == false) err = res.error
    if(err) Util.TE(err, true);

    login_info = {
      token:res.token,
      user:res.user
    }

    let user;
    if(err) Util.TE(err, true);
    if(!err) user = this.Login(login_info);

    if(!user) Util.TE('Error loggin user in', true);
    return user
  }

}
