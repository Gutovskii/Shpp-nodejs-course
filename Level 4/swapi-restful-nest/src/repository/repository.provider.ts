import { Provider } from "@nestjs/common";
import dataSource from "configs/orm/dbconfig";
import { CommonEnum } from "src/common/common.enum";

export const DbProvider: Provider = {
    provide: CommonEnum.INJECT_DATA_SOURCE,
    useFactory: async () => dataSource.initialize()
}