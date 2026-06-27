type BuildPaginatedPathParams = {
  pathname: string;
  searchParams: URLSearchParams;
  page: number;
  limit: number;
};

export function buildPaginatedPath({
  pathname,
  searchParams,
  page,
  limit,
}: BuildPaginatedPathParams) {
  const params = new URLSearchParams(searchParams.toString());

  params.set("page", String(page));
  params.set("limit", String(limit));

  const query = params.toString();

  return query ? `${pathname}?${query}` : pathname;
}
