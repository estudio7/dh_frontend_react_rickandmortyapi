import { useCharacters } from '../api/service';
import { useState } from 'react';

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

export const Characters = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCharacters(page);

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro ao carregar os personagens</div>

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
  };

  // Calcular a quantidade de páginas restantes
  const remainingPages = data.info.pages - page;

  // Manipulador para quando o valor do seletor muda
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(parseInt(e.target.value));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {data.results.map((character: Character) => (
          <div key={character.id} className="rounded overflow-hidden shadow-lg">
            <img className="w-full" src={character.image} alt={character.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{character.name}</div>
              <p className="text-gray-700 text-base">{character.status}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage}>Página anterior</button>
        <button onClick={nextPage}>Próxima página</button>
        <select value={page} onChange={handleSelectChange}>
          {Array.from({ length: data.info.pages }, (_, i) => i + 1).map((pageNumber) => (
            <option key={pageNumber} value={pageNumber}>
              Página {pageNumber}
            </option>
          ))}
        </select>
      </div>
      <div>Páginas restantes: {remainingPages}</div>
    </div>
  );
};
