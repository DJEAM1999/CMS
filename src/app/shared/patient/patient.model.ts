import { PatientsClinic } from "../patients-clinic/patiens-clinic.model";

export class Patient {
    public patientId: number = 0;
    public name: string = '';
    public nationalNo: number = 0;
    public passportNo: number = 0;
    public patientsClinics?: PatientsClinic[];
}