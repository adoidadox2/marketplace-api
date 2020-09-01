import Ad from "../models/Ad";
import User from "../models/User";

export default interface PurchaseMailJobDTO {
  data: {
    ad: Ad;
    user: User;
    content: string;
  };
}
