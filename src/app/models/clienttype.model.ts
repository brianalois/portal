import { Model }            from 'browser-model';
// import { Model }            from './model';
import * as _               from 'underscore';
import { API }              from './../helpers/api.helper';
import { Util }             from './../helpers/util.helper';

export class ClientType extends Model {
  apiUpdateValues:Array<string> = ['name'];//these are the values that will be sent to the API

  id;
  role;
  kind;

  static SCHEMA = {
    id:{type:'string', primary:true},//this means every time you make a new object you must give it a _id
    role:{type:'string'},
    kind:{name:{type:'string'}},
  };

  constructor(obj:object){
    super(obj);
  }

  static async GetAll(){
    let err, res;
    [err, res] = await Util.to(Util.get('/v1/clients/types'));
    if(err) Util.TE(err);
    if(!res.success) Util.TE(res.error);

    let client_types = []
    for (let i in res.client_types){
      let client_type_info = res.client_types[i];

      let client_type = this.findOneAndUpdate({id:client_type_info.id}, client_type_info, {upsert:true});
      client_types.push(client_type);
    }

    return client_types;
  }

}
