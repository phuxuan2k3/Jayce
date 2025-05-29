import { TemplateCore } from "../../../../../infra-test/core/test.model";

export type TemplateFormData = Omit<TemplateCore, 'id'>;