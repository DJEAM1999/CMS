import { Clinic } from "../clinic/clinic.model";
import { Patient } from "../patient/patient.model";

export class PatientsClinic {
    fileNo: number = 0;
    patientId: number = 0;
    patient: Patient = new Patient();
    clinicId: number = 0;
    clinic: Clinic = new Clinic();
    fileStatus: number = 0;
    entryDate: Date = new Date();
    exitDate: Date = new Date();

}