import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle('E-comm API')
    .setDescription('The e-comm API description CURD')
    .setVersion('1.0')
    .addTag('e-comm')
    .build();