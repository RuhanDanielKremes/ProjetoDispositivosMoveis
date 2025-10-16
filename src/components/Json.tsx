import axios from "axios";

export class HttpConection{

    private url: string = "https://api.tgdevstudios.com/api/system";

    public constructor(endpoint:string){
        this.url += endpoint;
    }

    public setUrl(url:string){
        this.url = url;
    }

    public getUrl(){
        return this.url;
    }

    public static setHeader(key:string,value:string){
        axios.defaults.headers.common[key] = value
    }

    public static getHeaders(){
        console.log(axios.defaults.headers);
    }

    public sendJson(endpoint:string,type:string,data:any = null):Promise<any> {
        let result:any
        switch (type) {
            case 'GET':
                result = axios.get(this.url + endpoint).then(function(response) {
                    return response;
                }).catch(function(error){
                    return error;
                });
                break;
            
            case 'POST':
                result = axios.post(this.url + endpoint,data).then(function(response) {
                    return response;
                }).catch(function(error){
                    return error;
                });
                break;
            
            case 'PUT':
                result = axios.put(this.url + endpoint,data).then(function(response) {
                    return response;
                }).catch(function(error){
                    return error;
                });
                break;

            case 'DELETE':
                result = axios.delete(this.url + endpoint).then(function(response) {
                    return response;
                }).catch(function(error){
                    return error;
                });
                break;
        
            default:
                break;
        }
        return result
    }

    public sendMultipart(endpoint:string,type:string,data:any = null):Promise<any>{
        let result:any;
        let formData = new FormData();
        formData.append('file',data);
        switch (type) {
            case 'POST':
                result = axios.post(
                    this.url + endpoint,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                ).then(function(response){
                    return response;
                }).catch(function(error){
                    return error;
                })
                break;
        
            case 'PUT':
                result = axios.put(
                    this.url + endpoint,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                ).then(function(response){
                    return response;
                }).catch(function(error){
                    return error;
                })
                break;
            
            default:
                break;
        }

        return result;
    }

    public sendMultipartMultipleData(endpoint:string,type:string,data:any, data2:any, data3:any):Promise<any>{
        let result:any;
        let formData = new FormData();
        console.log(data);
        console.log(data2);
        console.log(data3);
        if (data instanceof FileList) {
            Array.from(data).forEach(file => formData.append('files', file));
        } else {
            data.forEach((file: any) => formData.append('files', file));
        }
        formData.append('names', data2);
        formData.append('cpfCnpj', data3);
        console.log(formData);
        switch (type) {
            case 'POST':
                result = axios.post(
                    this.url + endpoint,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                ).then(function(response){
                    return response;
                }).catch(function(error){
                    return error;
                })
                break;
        
            case 'PUT':
                result = axios.put(
                    this.url + endpoint,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                ).then(function(response){
                    return response;
                }).catch(function(error){
                    return error;
                })
                break;
            
            default:
                break;
        }

        return result;
    }
}