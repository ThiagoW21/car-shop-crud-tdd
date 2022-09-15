import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockAll, carMockWithId } from '../../moks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

	before(async () => {
		sinon.stub(Model, 'create').resolves(carMockWithId);
		sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
		sinon.stub(Model, 'findOne').resolves(carMockWithId);
		sinon.stub(Model, 'find').resolves(carMockAll);
		sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
	});

	after(() => {
		sinon.restore();
	});

  describe('criando um carro', () => {
		it('cria com sucesso', async () => {
			const newCar = await carModel.create(carMock);
			expect(newCar).to.be.deep.equal(carMockWithId);
		});
	});

	describe('pesquisa carro por id', () => {
		it('encontra com sucesso', async () => {
			const car = await carModel.readOne('62cf1fc6498565d94eba52cd');

			expect(car).to.be.deep.equal(carMockWithId);
		});

		it('não encontra com id inválido', async () => {
			try {
				await carModel.readOne('BIIIIRRRLLVEMMONSTRO');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('atualiza carro', () => {
		it('atualiza com sucesso', async () => {
			const framesFound = await carModel.update('62cf1fc6498565d94eba52cd', carMock);
			expect(framesFound).to.be.deep.equal(carMockWithId);
		});

		it('não atualiza com um id inválido', async () => {
			try {
				await carModel.update('62cf1fc6498565d94eba52coc4', carMock);
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('deletar carro', () => {
		it('deleta com sucesso', async () => {
			const carDeleted = await carModel.delete('62cf1fc6498565d94eba52cd');
			expect(carDeleted).to.be.deep.equal(carMockWithId);
		});

		it('não deleta com um id inválido', async () => {
			try {
				await carModel.delete('62cf1fc6498565d94eba52coco');
			} catch (error: any) {
				expect(error.message).to.be.eq('InvalidMongoId');
			}
		});
	});

	describe('Retorna todos os carros', () => {
		it('Retorna uma lista de carros', async () => {
			const cars = await carModel.read();
			expect(cars).to.be.deep.equal(carMockAll);
		});
	});
});