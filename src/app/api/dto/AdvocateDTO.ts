import internal from "stream";


export default class AdvocateDTO {
   firstName?: string;
   lastName?: string;
   city?: string;
   degree?: string;
   specialties?: string[] | undefined;
   yearsOfExperience?: number;
   phoneNumber?: number;

   constructor(params: Partial<AdvocateDTO> = {}) {
      Object.assign(this, params);
   }
}