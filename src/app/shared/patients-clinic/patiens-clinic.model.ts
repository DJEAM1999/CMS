import { Clinic } from "../clinic/clinic.model";
import { Patient } from "../patient/patient.model";


export enum FileStatus {
    Closed = 0,
    Open = 1,
}

export class PatientsClinic {
    fileNo: number = 0;
    patientId: number = 0;
    patient?: Patient;
    clinicId: number = 0;
    clinic?: Clinic;
    fileStatus : FileStatus = FileStatus.Closed;
    entryDate?: Date;
    exitDate?: Date;
}