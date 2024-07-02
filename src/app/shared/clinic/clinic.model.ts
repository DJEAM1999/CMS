import { City } from '../city/city.model';

export class Clinic {
  public clinicId: number = 0;
  public name: string = '';
  public cityId: number = 0;
  public city!: City
}
