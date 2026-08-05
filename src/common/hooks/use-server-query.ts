import { useCallback, useEffect, useRef, useState } from "react";

interface UseServerQueryOptions<TData, TArgs extends unknown[]> {
  /**
   * A Server Action que será chamada para buscar os dados.
   */
  action: (...args: TArgs) => Promise<TData>;
  /**
   * Argumentos que serão passados para a Server Action.
   */
  args: TArgs;
  /**
   * Se false, o hook não fará a requisição automaticamente.
   * Ideal para modais (esperar o modal abrir para buscar os dados).
   */
  enabled?: boolean;
  /**
   * Dados iniciais caso você já os tenha de antemão (ex: SSR cache).
   */
  initialData?: TData;
}

/**
 * Hook customizado para buscar dados chamando uma Server Action a partir de um Client Component.
 * Emula o comportamento básico do React Query com tipagem forte.
 */
export function useServerQuery<TData, TArgs extends unknown[]>({
  action,
  args,
  enabled = true,
  initialData,
}: UseServerQueryOptions<TData, TArgs>) {
  const [data, setData] = useState<TData | undefined>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /* Usamos useRef para manter os argumentos sempre atualizados */
  /* sem disparar re-renders infinitos se um objeto for passado diretamente. */
  const argsRef = useRef(args);
  useEffect(() => {
    argsRef.current = args;
  }, [args]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await action(...argsRef.current);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, [action]);

  /* Serializamos os argumentos de forma simples apenas para servirem como */
  /* "Dependency Array" real do nosso useEffect principal, reagindo a mudanças de ID, por exemplo. */
  const argsTrigger = JSON.stringify(args);

  useEffect(() => {
    if (enabled) {
      /* Adiamos a execução para evitar chamadas de setState sincronas no corpo do effect */
      const timer = setTimeout(() => {
        refresh();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [enabled, argsTrigger, refresh]);

  return {
    data,
    isLoading,
    error,
    refresh,
  };
}
