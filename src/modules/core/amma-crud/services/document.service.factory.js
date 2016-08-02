"use strict";
const DocumentService = require('./document.service');
class DocumentServiceFactory {
    setServer(server) {
        this.server = server;
    }
    getDbParser(schema) {
        return this.server.settings.app.services.dbParserFactory.getDbParser(schema);
    }
    getDocumentService(collectionName) {
        const documentService = new DocumentService.default();
        documentService.setServer(this.server);
        documentService.setCollectionName(collectionName);
        const dbParser = this.getDbParser(documentService.getModel().schema);
        documentService.setDbParser(dbParser);
        return documentService;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentServiceFactory;
