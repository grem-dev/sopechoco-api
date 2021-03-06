import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/users/user.module';
import {
  CatalogController,
  GuisoController,
} from './controllers/catalog.controller';
import { GuisoMapper } from './mapper/guiso.mapper';
import { ProductMapper } from './mapper/product.mapper';
import { BaseProdRepo } from './repo/BaseProduct.repo';
import { GuisoRepo } from './repo/guiso.repo';
import { BaseProdSchema } from './schema/baseprod.schema';
import { GuisoSchema } from './schema/guiso.schema';
import { BaseProductService } from './service/baseproduct.service';
import { GuisoService } from './service/guiso.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BaseProduct', schema: BaseProdSchema },
      { name: 'Guiso', schema: GuisoSchema },
    ]),
    UserModule,
  ],
  controllers: [CatalogController, GuisoController],
  providers: [
    // SERVICES
    BaseProductService,
    GuisoService,
    // REPOS
    BaseProdRepo,
    GuisoRepo,
    // MAPPERS
    ProductMapper,
    GuisoMapper,
  ],
  exports: [GuisoRepo, BaseProdRepo],
})
export class CatalogModule {}
