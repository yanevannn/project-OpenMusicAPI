class AlbumsHandler {
    constructor(service, validator) {
      this._service = service;
      this._validator = validator;
  
      // Menggunakan arrow function untuk pengikatan `this`
      this.postAlbumHandler = this.postAlbumHandler.bind(this);
      this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
      this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
      this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }
  
    async postAlbumHandler(request, h) {
      this._validator.validateAlbumPayload(request.payload);
      const { name, year } = request.payload;
      const albumId = await this._service.addAlbum({ name, year });
      const response = h.response({
        status: 'success',
        // message: 'Album successfully added',
        data: {
          albumId,
        },
      });
      response.code(201);
      return response;
    }
  
    async getAlbumByIdHandler(request, h) {
      const { id } = request.params;
      // console.log(id);
      const album = await this._service.getAlbumById(id);
      // console.log(album);
      const response = h.response({
        status: 'success',
        data: {
          album,
        },
      });
      response.code(200);
      return response;
    }
  
    async putAlbumByIdHandler(request, h) {
      this._validator.validateAlbumPayload(request.payload);
      const { id } = request.params;
      await this._service.editAlbumById(id, request.payload);
      const response = h.response({
        status: 'success',
        message: 'Album successfully updated',
      });
      response.code(200);
      return response;
    }
  
    async deleteAlbumByIdHandler(request, h) {
      const { id } = request.params;
      await this._service.deleteAlbumById(id);
      const response = h.response({
        status: 'success',
        message: 'Album successfully deleted',
      });
      response.code(200);
      return response;
    }
  }
  
  module.exports = AlbumsHandler;
  