import { expect } from 'chai';
import * as sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carInvalidDataMock, carMock, carMockAll, carMockWithId } from '../../moks/carMock';

describe('Car Service', () => {
	const carModel = new CarModel();
	const carService = new CarService(carModel);

	before(async () => {
		sinon.stub(carModel, 'create').resolves(carMockWithId);
		sinon.stub(carModel, 'readOne')
			.onCall(0).resolves(carMockWithId) 
			.onCall(1).resolves(null);
    sinon.stub(carModel, 'read')
    .onCall(0).resolves(carMockAll) 
    .onCall(1).resolves([]);
    sinon.stub(carModel, 'update')
      .onCall(0).resolves(carMockWithId) 
      .onCall(1).resolves(carMockWithId) 
      .onCall(2).resolves(carMockWithId) 
      .onCall(3).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId) 
      .onCall(1).resolves(carMockWithId) 
      .onCall(2).resolves(null) 
	})
	after(() => {
		sinon.restore()
	})
	describe('Cria carro', () => {
		it('Cria carro com sucesso', async () => {
			const carCreated = await carService.create(carMock);

			expect(carCreated).to.be.deep.equal(carMockWithId);
		});

		it('Em caso de falha', async () => {
      let error;

			try {
				await carService.create({});
			} catch (err) {error = err}

       expect(error).to.be.instanceOf(ZodError);
		});
	});

	describe('Obter carr por id', () => {
		it('Success', async () => {
			const car = await carService.readOne(carMockWithId._id);

			expect(car).to.be.deep.equal(carMockWithId);
		});

		it('Em caso de falha', async () => {
      let error;

			try {
				await carService.readOne(carMockWithId._id);

			} catch (err:any) { error = err }
        expect(error, 'error should be defined').not.to.be.undefined;
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});

  describe('Obter todos os carros', () => {
		it('Retorna uma lista com todos os carros', async () => {
			const car = await carService.readAll();

			expect(car).to.be.deep.equal(carMockAll);
		});

		it('Retorna um array vazinho quando não tem carro', async () => {

			const car = await carService.readAll();

			expect(car).to.be.deep.equal([]);
		});
	});

  describe('Atualiza carros', () => {
		it('Atualiza um carro com sucesso', async () => {
			const car = await carService.update(carMockWithId._id, carMock);

			expect(car).to.be.deep.equal(carMockWithId);
		});

		it('não atualiza com um id inválido', async () => {
			try {
				await carService.update('62cf1fc6498565d94eba52coc4', carMock);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});

    it('não atualiza com um id que não existe', async () => {
			try {
				await carService.update('62cf1fc6498565d94eba52coc4', carMock);
			} catch (error: any) {
				expect(error.message).to.be.eq('EntityNotFound');
			}
		});

    it('não atualiza com o body com tipos inválidos', async () => {
			try {
				await carService.update('62cf1fc6498565d94eba52coc4', carInvalidDataMock);
			} catch (error: any) {
				expect(error).to.be.instanceOf(ZodError);
			}
		});
	});

  describe('deletar carro', () => {
		it('deleta com sucesso', async () => {
			const carDeleted = await carService.delete(carMockWithId._id);
			expect(carDeleted).to.be.deep.equal(carMockWithId);
		});

		it('não deleta com um id inválido', async () => {
			try {
				await carService.delete('62cf1fc6498565d94eba52coco');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});

    it('não deleta com um id que não existe', async () => {
			try {
				await carService.delete('62cf1fc6498565d94eba52coco');
			} catch (error: any) {
				expect(error.message).to.be.eq('EntityNotFound');
			}
		});
	});
});