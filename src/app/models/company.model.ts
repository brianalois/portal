import { Model, Col }            from 'browser-orm';
// import { Model, Col }            from './model';
import { User }             from './user.model';
import { API }              from './../helpers/api.helper';
import { Util }             from './../helpers/util.helper';

export class Company extends Model {
  apiUpdateValues:Array<string> = ['name'];//these are the values that will be sent to the API


  help:string;

  @Col({primary:true})
  id:number;
  @Col()
  name:string;
  @Col()
  users: Array<{user_id:string, permissions:Array<string>}>;

  constructor(obj:object){
    super(obj);
  }

  Users(){
    return this.belongsToMany(User, 'users.user_id', 'id', true);
  }

  to(action){
    return Util.route('/company/'+action+'/'+this.id);
  }

  async saveAPI(){
    return API.save(this, '/v1/companies/'+this.id);
  }

  async removeAPI(){
    return API.remove(this, '/v1/companies/'+this.id);
  }

  //Static

  static to(action){
    return Util.route('/company/'+action);
  }

  static resCreate(res_company){//create company instance from a company response
    let company;
    let company_info = res_company;

    company_info.users = [];
    let users = company_info.Users;
    for(let i in users){
      let user_info = users[i];
      let user = User.createOrUpdate(user_info);
      company_info.users.push({user_id:user.id})
    }

    company = this.createOrUpdate(company_info);

    return company;
  }

  static async CreateAPI(companyInfo:any){
    let err, res;
    [err, res] = await Util.to(Util.post('/v1/companies', companyInfo));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);
    let company = this.resCreate(res.company);
    company.emit(['newly-created'], companyInfo, true);
    return company;
  }

  static async getById(id:string){
    // let company = this.findById(id);
    // if(company) return company;

    let company;
    let err, res; //get from API
    [err, res] = await Util.to(Util.get('/v1/companies/'+id));
    if(err) Util.TE(err.message, true);
    if(!res.success) Util.TE(res.error, true);

    let company_info = res.company;
    company = this.resCreate(res.company);
    return company;
  }

}
