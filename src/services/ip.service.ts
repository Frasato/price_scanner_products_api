import { Injectable } from "@nestjs/common";

@Injectable()
export class IpService{
    private ipListMemory: string[] = [];

    setIp(ip: string) {
        if(!this.ipListMemory.includes(ip)){
            this.ipListMemory.push(ip);
            return {message: "SUCCESS!"}
        }
        return {message: "ERROR: IP already exist"}
    }

    getIpList(){
        return this.ipListMemory;
    }
}