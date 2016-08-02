import Mongoose = require('mongoose');
import Hapi = require('hapi');
import DocumentService = require('./document.service');
import DbParser = require('../../amma-db-parser/services/db.parser');

export interface IDocumentServiceFactory {
    setServer(server:Hapi.Server):void;
    getDocumentService(collectionName:string): DocumentService.IDocumentService;
}

class DocumentServiceFactory implements IDocumentServiceFactory {

    protected server:Hapi.Server;

    setServer(server:Hapi.Server) {
        this.server = server;
    }

    protected getDbParser(schema:Mongoose.Schema):DbParser.IDbParser {
        return this.server.settings.app.services.dbParserFactory.getDbParser(schema);
    }

    getDocumentService(collectionName:string):DocumentService.IDocumentService {
        const documentService = new DocumentService.default();
        documentService.setServer(this.server);
        documentService.setCollectionName(collectionName);
        const dbParser = this.getDbParser(documentService.getModel().schema);
        documentService.setDbParser(dbParser);
        return documentService;
    }

}
export default DocumentServiceFactory;