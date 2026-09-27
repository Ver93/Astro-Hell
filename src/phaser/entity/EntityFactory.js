import BaseTemplate from "../data/entity/BaseTemplate.js";

export default class EntityFactory {
    constructor(templates) {
        this.templates = templates;
    }

    create(templateName, data = {}) {
        const template = this.templates[templateName];

        if (!template) {
            throw new Error(`No template found: ${templateName}`);
        }

        return structuredClone({
            ...BaseTemplate.base_entity,
            ...template,
            ...data
        });
    }
}
