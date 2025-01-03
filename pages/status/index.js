import useSWR from "swr";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuConstruction } from "react-icons/lu";
import { LuServerCrash } from "react-icons/lu";
import { LuServerOff } from "react-icons/lu";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <div className="w-full lg:px-8 px-4 pt-8">
      <div className="flex justify-center m-2">
        <FaRegCheckCircle
          className="text-green-500"
          style={{ fontSize: "90px" }}
        />
      </div>
      <div className="flex justify-center mt-6">
        <h1 className="text-4xl text-center font-bold">
          Todos os sistemas estão operacionais
        </h1>
      </div>
      <div className="flex flex-col items-start lg:flex-row justify-center mt-6 lg:mt-10">
        <div className="flex items-center mr-8 mb-4 lg:mb-0">
          <FaRegCheckCircle
            className="text-green-500 mr-1"
            style={{ fontSize: "15px" }}
          />
          <p className="text-xs text-center">Nenhum problema</p>
        </div>
        <div className="flex items-center mr-8 mb-4 lg:mb-0">
          <LuConstruction
            className="text-yellow-600 mr-1"
            style={{ fontSize: "15px" }}
          />
          <p className="text-xs text-center">Manutenção</p>
        </div>
        <div className="flex items-center mr-8 mb-4 lg:mb-0">
          <LuServerCrash
            className="text-yellow-600 mr-1"
            style={{ fontSize: "15px" }}
          />
          <p className="text-xs text-center">Interrupção parcial</p>
        </div>
        <div className="flex items-center mb-4 lg:mb-0">
          <LuServerOff
            className="text-red-700 mr-1"
            style={{ fontSize: "15px" }}
          />
          <p className="text-xs text-center">Interrupção</p>
        </div>
      </div>
      <DatabaseStatus />
      <div className="justify-center mt-10 mb-10">
        <UpdatedAt />
      </div>
    </div>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <p className="text-center text-gray-400">
      Última atualização: {updatedAtText}
    </p>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatusInformation = (
    <div className="flex justify-center items-center h-full">
      <p className="text-center text-gray-500">Carregando...</p>
    </div>
  );

  if (!isLoading && data) {
    databaseStatusInformation = (
      <div className="card flex flex-wrap mt-4 lg:mt-12 w-full lg:w-3/5 mx-auto">
        <p className="text-xs flex-row flex-shrink mx-8 mt-7 mb-4 font-semibold text-gray-400">
          Database
        </p>
        <div className="w-full border-t border-1 mx-8 border-gray-50"></div>
        <div className="w-full p-4">
          <div className="flex">
            <div className="flex-col justify-center ml-3">
              <p className="text-m">
                Versão: {data.dependencies.database.version}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-1 mx-8 border-gray-50"></div>
        <div className="w-full p-4">
          <div className="flex">
            <div className="flex-col justify-center ml-3">
              <p className="text-m">
                Conexões abertas:{" "}
                {data.dependencies.database.opened_connections}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-1 mx-8 border-gray-50"></div>
        <div className="w-full p-4">
          <div className="flex">
            <div className="flex-col justify-center ml-3">
              <p className="text-m">
                Conexões máximas: {data.dependencies.database.max_connections}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{databaseStatusInformation}</>;
}
