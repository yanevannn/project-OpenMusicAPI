class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const {
            title, year, genre, performer, duration, albumId,
        } = request.payload;
        const songId = await this._service.addSong({
            title, year, genre, performer, duration, albumId,
        });
        const response = h.response({
            status: 'success',
            message: 'Song successfully added',
            data: {
                songId,
            },
        });
        response.code(201);
        return response;
    }

    async getSongsHandler(request, h) {
        const { title = null, performer = null } = request.query;
        const songs = await this._service.getAllSongs(title, performer);
        const response = h.response({
            status: 'success',
            data: {
                songs,
            },
        });
        response.code(200);
        return response;
    }

    async getSongByIdHandler(request, h) {
        const { id } = request.params;
        const song = await this._service.getSongById(id);
        const response = h.response({
            status: 'success',
            data: {
                song,
            },
        });
        response.code(200);
        return response;
    }

    async putSongByIdHandler(request, h) {
        this._validator.validateSongPayload(request.payload);
        const { id } = request.params;
        await this._service.editSongById(id, request.payload);
        const response = h.response({
            status: 'success',
            message: 'Song successfully updated',
        });
        response.code(200);
        return response;
    }

    async deleteSongByIdHandler(request, h) {
        const { id } = request.params;
        await this._service.deleteSongById(id);
        const response = h.response({
            status: 'success',
            message: 'Song successfully deleted',
        });
        response.code(200);
        return response;
    }
}

module.exports = SongsHandler;
