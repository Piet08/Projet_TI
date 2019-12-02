export interface ReviewDto {
  id: number;
  star: number;
  comment: string;
  isValid: number;
  idUser: number;
  idPlace: number;
  date:string;
}
