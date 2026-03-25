import { PrecosService } from "./products.service";

test('Return Product Name and Prices Succes', async () =>{
    const embalagemRepository = {
        buscarPorCodigo: jest.fn()
    }

    const unidadeRepository = {
        findUnidade: jest.fn()
    }

    const itemRepository = {
        findItem: jest.fn()
    }

    embalagemRepository.buscarPorCodigo.mockResolvedValue({
        produto: {descricao: 'Produto Teste'},
        precovenda: '12.3',
        codigobarras: '123',
        precooferta: '10.9'
    });

    itemRepository.findItem.mockResolvedValue({id: 12, codigo: '01'});
    unidadeRepository.findUnidade.mockResolvedValue({id: 8});

    const service = new PrecosService(
        embalagemRepository as any,
        itemRepository as any,
        unidadeRepository as any
    );

    const result = await service.buscarPorCodigoBarras('123');
    expect(result.produto).toBe('Produto Teste');
});