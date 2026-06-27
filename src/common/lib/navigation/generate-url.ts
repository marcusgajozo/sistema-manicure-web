type ExtractRouteParamNames<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param extends ""
      ? ExtractRouteParamNames<`/${Rest}`>
      : Param extends `${string}/${string}`
        ? never
        : [Param, ...ExtractRouteParamNames<`/${Rest}`>]
    : Path extends `${string}:${infer Param}`
      ? Param extends `${string}/${string}`
        ? never
        : [Param]
      : [];

type HasRouteParams<Path extends string> =
  ExtractRouteParamNames<Path> extends readonly [] ? false : true;

export type RouteParamsFor<Path extends string> =
  ExtractRouteParamNames<Path> extends readonly []
    ? never
    : {
        [Key in ExtractRouteParamNames<Path>[number]]: string | number;
      };

type DeepRouteValues<T> = T extends string
  ? T
  : T extends Record<string, unknown>
    ? DeepRouteValues<T[keyof T]>
    : never;

function fillRouteParams(
  template: string,
  params: Record<string, string | number>,
) {
  return template.replace(/:([A-Za-z0-9_]+)/g, (_, key: string) => {
    const value = params[key];

    if (value === undefined || value === null) {
      throw new Error(`Missing route param "${key}" for "${template}".`);
    }

    return encodeURIComponent(String(value));
  });
}

export function generateUrl<Path extends string>(
  route: Path,
  ...args: HasRouteParams<Path> extends true
    ? [params: RouteParamsFor<Path>]
    : []
): string {
  if (args.length === 0) {
    return route;
  }

  return fillRouteParams(route, args[0] as Record<string, string | number>);
}

export type { DeepRouteValues };
