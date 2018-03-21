// import * as _ from 'underscore';
// import * as get from 'lodash.get';
// import "reflect-metadata";
//
// export class Model{
//
//   public static model_name:string;
//   static _instances: Array<Model>;
//   public static all_data:Array<object>;
//
//   constructor(obj_data:any){
//     (<any>Object).assign(this, obj_data);
//   }
//
//   getModelName(){
//     return this.static.getModelName();
//   }
//
//   toObject(){
//     let properties = Object.getOwnPropertyNames(this);
//     let obj:any = {};
//     for ( let i in properties){
//       let property:any = properties[i];
//       obj[property] = (<any> this)[property]
//     }
//
//     return obj
//   }
//
//   uniqueQueryIdentifier(){
//     let primary_id = this.static.getPrimaryKey();
//     let query_obj:any = {};
//     query_obj[primary_id] = (<any> this)[primary_id];
//     return query_obj;
//   }
//
//   uniqueIdName(){
//     return this.static.getPrimaryKey();
//   }
//
//   uniqueId(){
//     let unique_name = this.uniqueIdName();
//     return (<any> this)[unique_name];
//   }
//
//   save(){
//     let query_obj = this.uniqueQueryIdentifier();
//     let update_object = this.toObject();
//     this.static.findOneAndUpdate(query_obj, update_object, {upsert:true});
//     this.emit(['save', 'change']);
//     // return (this.constructor as any).instantiateObject(update_object);
//   }
//
//   remove(){
//     let query_obj = this.uniqueQueryIdentifier();
//     this.static.remove(query_obj);
//     this.static.removeInstance(query_obj);
//     this.emit(['remove', 'change']);
//   }
//
//   reload(){//updates instance storage from browser data
//     let model = this.static.findById(this.uniqueId(), true);
//     let obj = model.toObject();
//     (<any>Object).assign(this, obj);
//     this.emit(['reload', 'change']);
//   }
//
//   getStorageValues(){
//     let name:any = this.uniqueIdName();
//     let id:any = (<any> this)[name];
//     return this.static.findById(id, true).toObject();
//   }
//
//   getInstanceValues(){
//     return this.toObject();
//   }
//
//   getPropertyDifferences(){
//     let instance = this.getInstanceValues();
//     let storage = this.getStorageValues();
//     return this.static.difference(instance, storage);
//   }
//
//   get static(){
//     return (this.constructor as any);
//   }
//   storageDifference(){
//     let diff = this.getPropertyDifferences();
//     let storage = this.getStorageValues();
//
//     let storage_differences = _.pick(storage, (value:any, key:any, object:any)=>{
//       return diff.includes(key);
//     })
//
//     return storage_differences;
//   }
//
//   instanceDifference(){
//     let diff = this.getPropertyDifferences();
//     let instance = this.getInstanceValues();
//
//     let instance_differences = _.pick(instance, (value:any, key:any, object:any)=>{
//       return diff.includes(key);
//     })
//
//     return instance_differences;
//   }
//
//   //********               *********
//   //******** RELATIONSHIPS *********
//   //********               *********
//
//   belongsTo(model:any, foreign_key:any, reference_key:any){
//     let query_obj:any = {}
//     query_obj[reference_key] = (<any> this)[foreign_key];
//     return model.findOne(query_obj);
//   }
//
//   hasOne(model:any, foreign_key:any, reference_key:any){
//     let query_obj:any = {}
//     query_obj[foreign_key] = (<any> this)[reference_key];
//     return model.findOne(query_obj);
//   }
//
//   hasMany(model:any, foreign_key:any, reference_key:any){
//     let query_obj:any = {}
//     query_obj[foreign_key] = (<any> this)[reference_key];
//     return model.find(query_obj);
//   }
//
//
//
//   belongsToMany(model:any, foreign_key:any, reference_key:any, contains?:boolean){
//     let query_obj:any = {};
//     if(contains){
//
//       let value_array = this.static.newGet(this.toObject(), foreign_key);
//       let instance_array:Array<any> = [];
//
//       for (let i in value_array){
//         let value = value_array[i];
//         query_obj[reference_key] = value;
//         let instances = model.find(query_obj);
//         instance_array = instance_array.concat(instances)
//       }
//
//       return instance_array;
//
//     }else{
//       query_obj[foreign_key] = get(this.toObject(), reference_key);
//       return model.findArray(query_obj);
//     }
//
//   }
//
//
//   //***************************************
//   //*********** STATIC ********************
//   //***************************************
//
//   static describe(): Array<string> {
//     let properties = Object.getOwnPropertyNames(this);
//     properties = properties.splice(3);
//     return properties;
//   }
//
//   static setlocalStorage(name:string, data:Object){
//     localStorage.setItem(name, JSON.stringify(data));
//   }
//
//   static getlocalStorage(name:string): Object{
//     return JSON.parse(localStorage.getItem(name) || '[]');
//   }
//
//   static removeLocalStorage(name: string){
//     localStorage.removeItem(name);
//   }
//
//   static getModelName(){
//     if(!this.model_name) this.model_name = this.toString().split ('(' || /s+/)[0].split (' ' || /s+/)[1];
//     return this.model_name;
//   }
//
//   static removeAllData(){
//     let model_name = this.getModelName();
//     this.removeLocalStorage(model_name);
//     this._instances = [];
//     this.emit(['remove', 'change']);
//   }
//
//   static setAllData(data: Array<Object>){
//     let model_name = this.getModelName();
//     this.setlocalStorage(model_name, data);
//   }
//
//   static getAllData(){
//     let model_name = this.getModelName();
//     let data: any = this.getlocalStorage(model_name);
//     if(!data){
//       data = [];
//       this.setAllData(data);
//     }
//
//     return data;
//   }
//
//   static getPrimaryKey(){
//     let schema:any = this.SCHEMA;
//     let primary_key = 'id';
//     for (let key in schema){
//       let prop = schema[key];
//       if(typeof prop==='object'){
//         for(let i in prop){
//           let eprop = prop[i];
//           if(i === 'primary' && eprop === true){
//             primary_key = key;
//           }
//         }
//       }
//     }
//     return primary_key;
//   }
//
//
//   static schemaValidate(data: any){
//     let schema:any = this.getSchema();
//     let new_data:any = {};
//     for ( let key in schema){
//       if(data[key]){
//         new_data[key] = data[key]
//       }else{
//         new_data[key] = '';
//       }
//     }
//
//     return new_data
//   }
//
//   //singe means that this object does not share a data reference to anywhere else
//   static instantiateObject(obj_data:any, single?:boolean){//this gets it so the object has the same reference and thus data in components
//     let obj:any;
//     if(!this._instances) this._instances = [];
//
//     if(typeof single !== "undefined" && single === true){
//       obj =  new this(obj_data);
//       return obj
//     }
//
//     let primary_key = this.getPrimaryKey();
//     obj = this._instances.filter((instance:any)=>{
//       return instance[primary_key] === obj_data[primary_key] && instance instanceof this
//     })[0];
//
//     if(!obj){
//       obj =  new this(obj_data);
//       this._instances.push(obj);
//     }
//
//     return obj
//   }
//
//   static create(data:any, single?:boolean){
//     let old_data: Array<Object> = this.getAllData();
//
//     let instance = this.schemaValidate(data);
//
//     let primary_key = this.getPrimaryKey();
//     if(!instance[primary_key]){
//       let id:any = 1;
//       if(old_data.length!=0){
//         id = Math.max.apply(Math,old_data.map(function(o:any){return o[primary_key];}))
//         id++;
//       }
//       instance[primary_key] = id;
//     }
//
//     let check = old_data.filter((m:any)=>m[primary_key] === instance[primary_key])[0];
//     if(check) {
//       throw Error(`Duplicate key in ${this.getModelName()} model, key: ${primary_key} value: ${instance[primary_key]}`);
//     }//means there is already an object with this primary key
//
//     if(!instance[primary_key] || instance[primary_key] == ''){
//       throw Error(`No key given in ${this.getModelName()} model, key: ${primary_key} value: ${instance[primary_key]}`);
//     }
//
//     old_data.push(instance);
//     this.setAllData(old_data);
//     let inst_obj = this.instantiateObject(instance, single);
//
//     this.emit(['create', 'change']);
//     return inst_obj;
//   }
//
//
//   static removeInstance(search:object){//Removes instance from the app storage
//     this._instances = this._instances.filter(instance=>{
//       let obj = instance.toObject();
//       return !_.isMatch(obj, search);
//     })
//
//     this.emit(['remove', 'change']);
//   }
//
//
//   static removeStorage(search:object){//Removes instance from browser storage
//     let all_data = this.getAllData();
//     let new_data = all_data.filter((data:object)=>{ return !_.isMatch(data, search)});
//     this.setAllData(new_data);
//   }
//
//   static remove(search:object){
//     this.removeStorage(search);
//     this.emit(['remove', 'change']);
//   }
//
//   static update(search:object, new_data?:any, single?:boolean){
//     let all_data = this.getAllData();
//     let instances = all_data.filter((data:object)=>{ return _.isMatch(data, search)});
//     if(!instances){
//       return null;
//     }
//
//     this.remove(search);
//     let array = [];
//     for( let i in instances){
//       let instance:any = instances[i];
//       let primary = this.getPrimaryKey();
//       let query_obj:any ={};
//       query_obj[primary] = (<any> instance)[primary];
//       let r_instance = this.updateOne(query_obj, new_data, single);
//       array.push(r_instance);
//     }
//
//     return array;
//   }
//
//   static updateOne(search:object, new_data:any, single?:boolean){
//
//     let all_data:any = this.getAllData();
//     let instance:any = all_data.filter((data:any)=>{ return _.isMatch(data, search)})[0];
//     if(!instance) return null;
//
//     this.remove(search);
//     for (let o in new_data){
//       instance[o] = new_data[o];
//     }
//
//
//     let new_i = this.create(instance, single);
//     let obj = new_i.toObject();
//
//     let schema = this.getSchema();
//     for(let i in new_data){
//       if(schema[i]){
//         new_i[i] = new_data[i];
//       }
//     }
//
//
//     return new_i;
//   }
//
//   static search(search:any){
//     let all_data = this.getAllData();
//
//     let instances = all_data.filter((data:object)=>{
//       let found = true;
//       let keys = _.keys(search);
//       for (let i in keys){
//         let key = keys[i];
//         let value = search[key];
//
//         let nested_value = get(data, key);
//         if(nested_value!=value) found = false;
//
//       }
//       return found;
//     });
//
//     return instances;
//   }
//
//   static find(search:object, single?:boolean){
//     let all_data = this.getAllData();
//
//     let instances = this.search(search);
//
//     let final_objs = instances;
//     let array = []
//     for (let i in final_objs){
//       let instance = final_objs[i];
//       instance = this.instantiateObject(instance, single)
//       array.push(instance);
//     }
//
//     return array;
//   }
//
//   static findOne(search?:object, single?:boolean){
//     let all_data = this.getAllData();
//     let instance;
//     if(!search){
//       instance = all_data[0];
//     }else{
//       instance = this.search(search)[0];
//     }
//     if(typeof instance === 'undefined' || !instance) return null;
//
//     instance = this.instantiateObject(instance, single)
//     return instance;
//   }
//
//   static findArray(search:any, single?:boolean){
//     let all_data = this.getAllData();
//     let key = _.keys(search)[0];
//     let value = search[key];
//     let instances = all_data.filter((data:any)=>{
//       let nested_value = this.newGet(data, key);
//       return nested_value.length>0;
//     });
//
//     let final_objs = instances;
//     let array = []
//     for (let i in final_objs){
//       let instance = final_objs[i];
//       instance = this.instantiateObject(instance, single)
//       array.push(instance);
//     }
//
//     return array;
//   }
//
//   static findOneArray(search?:any, single?:boolean){
//     let all_data = this.getAllData();
//     let instance;
//     if(!search){
//       instance = all_data[0];
//     }else{
//       let key = _.keys(search)[0];
//       let value = search[key];
//
//       instance = all_data.filter((data:any)=>{
//         let nested_value = this.newGet(data, key);
//         return nested_value.length>0;
//       })[0];
//     }
//     if(typeof instance === 'undefined' || !instance) return null;
//
//     instance = this.instantiateObject(instance, single)
//     return instance;
//   }
//
//   static findOneAndUpdate(search:object, data?:any, options?:any){
//     if(typeof search !== 'object') throw Error(`No search query given in ${this.getModelName()} model`);
//
//     let all_data = this.getAllData();
//     let instance = all_data.filter((data:object)=>{ return _.isMatch(data, search);})[0];
//     let final_obj = instance;
//     if(!instance){
//       if(typeof options === 'object' && options.upsert === true){
//         if(_.isEmpty(data)){
//           instance = this.create(search, options.single);
//         }else{
//           instance = this.create(data, options.single);
//         }
//       }else{
//         instance = null;
//       }
//     }else{
//       instance = this.updateOne(search, data, options.single)
//     }
//
//     return instance;
//   }
//
//   static createOrUpdate(search:object){
//     let primary_key = this.getPrimaryKey();
//     let value:any = (<any> search)[primary_key];
//     let query_obj:any = {};
//     query_obj[primary_key] = value;
//     let new_i = this.findOneAndUpdate(query_obj, search, {upsert:true});
//     return new_i
//   }
//
//   static findById(id:string, single?:boolean){
//     let primary_key:any = this.getPrimaryKey();
//     let obj:any = {};
//     obj[primary_key] = id;
//     return this.findOne(obj, single);
//   }
//
//   static difference(a:any, b:any){
//     let diff =  _.reduce(a, function(result:any, value:any, key:any) {
//       return _.isEqual(value, b[key]) ?
//         result : result.concat(key);
//     }, []);
//     return diff;
//   }
//
//   static newGet(obj:object, str:string)
//   {
//     var keys = str.split(".") // split on dot notation
//
//     var check_array:Array<any> = [];
//
//     for(var i in keys)
//     {
//       let check_str:any;
//       let key:any = (<any> keys)[i];
//       let em_check_array=[];
//
//       if(check_array.length<=0){
//         let t = get(obj, key);
//         em_check_array.push(get(obj, key));
//       }else{
//         for (let z in check_array ){
//           let local_str = check_array[z];
//           check_str = local_str+'.'+key;
//           let t = get(obj, check_str);
//           if(_.isArray(t)){
//             em_check_array.push(get(obj, check_str));
//           }else{
//             em_check_array.push(get(obj, check_str));
//             break;
//           }
//         }
//
//       }
//
//       for(var t in em_check_array){
//         let check = em_check_array[t];
//         if(_.isArray(check)){
//           let len = check.length;
//           for (let o = 0; o<len;o++){
//             check_array.push(key+'['+o+']');
//           }
//         }else{
//
//           if(check_array.length<=0) {
//             check_array.push(key);
//           }else{
//             for (let o in check_array){
//               check_array[o] = check_array[o]+'.'+key
//             }
//
//           }
//         }
//
//       }
//     }
//
//     let values = [];
//     for (var i in check_array){
//       let check = check_array[i];
//       values.push(get(obj, check));
//     }
//
//     return values
//   }
//   //**********************************************************
//   //************* EVENTS *************************************
//   //**********************************************************
//
//   //Global Model Events
//   //events are change, create, remove
//   static _events:any;
//
//   static on(events:any, listener?:Function){
//     if(!this._events) this._events = {};
//
//     if(typeof events === 'string'){
//       if(!this._events[events]) this._events[events] = [];
//
//       this._events[events].push(listener);
//
//       return ()=>{
//         this._events[events] = this._events[events].filter((l:any) => l !== listener)
//       }
//     }else{
//       for (let i in events){
//         let event = events[i];
//         if(!this._events[event]) this._events[event] = [];
//
//         this._events[event].push(listener);
//       }
//
//       return ()=>{
//         for(let event of events){
//           this._events[event] = this._events[event].filter((l:any) => l !== listener)
//         }
//       }
//     }
//   }
//
//   static emit(events:any, data?:any){
//     if(!this._events) this._events = {};
//
//     if(typeof events === 'string'){
//       let event_listeners = this._events[events];
//       if(event_listeners) event_listeners.forEach((listener: any) => listener(data));
//     }else{
//       for ( let i in events){
//         let kind = events[i];
//         let event_listeners = this._events[kind];
//         if(event_listeners) event_listeners.forEach((listener: any) => listener(data));
//       }
//     }
//   }
//
//   //Instance Model Events
//   //events are save, remove, reload, change
//   _events:any = {};
//
//   on(events:any, listener?:Function){
//     if(typeof events === 'string'){
//       if(!this._events[events]) this._events[events] = [];
//
//       this._events[events].push(listener);
//
//       return ()=>{
//         this._events[events] = this._events[events].filter((l:any) => l !== listener)
//       }
//     }else{
//       for (let i in events){
//         let event = events[i];
//         if(!this._events[event]) this._events[event] = [];
//
//         this._events[event].push(listener);
//       }
//
//       return ()=>{
//         for(let event of events){
//           this._events[event] = this._events[event].filter((l:any) => l !== listener)
//         }
//       }
//
//     }
//   }
//
//   emit(events:any, data?:any, toStatic?:boolean){
//     if(typeof events === 'string'){
//       let event_listeners = this._events[events];
//       if(event_listeners) event_listeners.forEach((listener: any) => listener(data));
//     }else{
//       for ( let i in events){
//         let kind = events[i];
//         let event_listeners = this._events[kind];
//         if(event_listeners) event_listeners.forEach((listener: any) => listener(data));
//       }
//     }
//
//     if(toStatic) this.static.emit(events, data); //this will send it to the whole class events
//   }
//
//   //Static
//
//   public static SCHEMA:Object;
//
//   static getSchema(){
//     let schema:any = this.SCHEMA;
//     if(!schema[this.getPrimaryKey()]){
//       schema['id'] = {type:'number', primary:true}
//     }
//     console.log('s', schema);
//     return schema;
//   }
//   //test/
//   public static _cols:any;
//
//   static getCols(){
//     return this._cols;
//   }
// }
//
// export let Col = function(options?:any):any {
//
//   let defaults = {
//     unique  : false,
//     primary : false,
//   };
//
//   let set_options = (<any> Object).assign({}, defaults, options);
//
//   function actualDecorator(target: any, property: any) {
//     if(!target.constructor.SCHEMA) target.constructor.SCHEMA = {};
//
//     for(let i in target.constructor.SCHEMA){
//       let value = target.constructor.SCHEMA[i];
//       if(value.primary === true && set_options.primary === true) {
//         throw new Error(`Error: Can not have two columns set as primary in the same model. Columns "${i}" and "${property}" both have primary set to true.`);
//       }
//
//     }
//
//     let type = Reflect.getMetadata("design:type", target, property);
//
//     if(type == String){
//       // console.log('string', property)
//     }
//     target.constructor.SCHEMA[property] = set_options;
//
//   }
//
//   return actualDecorator
// }
