import kue from "kue";
import redisConfig from "../config/redisConfig";
import PurchaseMail from "../jobs/PurchaseMailJob";

const Queue = kue.createQueue({ redisConfig });

Queue.process(PurchaseMail.key, PurchaseMail.handle);

export default Queue;
