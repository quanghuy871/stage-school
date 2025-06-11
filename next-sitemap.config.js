module.exports = {
  siteUrl: 'https://floorscape.au',
  generateRobotsTxt: true,

  async additionalPaths(config) {
    const projectId = 'unrguu9n'
    const dataset = 'production'

    const query = encodeURIComponent(`
      {
        "pages": *[_type == "page"]{ "slug": slug.current },
        "solutions": *[_type == "solution"]{ "slug": slug.current }
      }
    `)

    const res = await fetch(
      `https://${projectId}.api.sanity.io/v1/data/query/${dataset}?query=${query}`
    )

    const data = await res.json()
    const { pages = [], solutions = [] } = data.result

    const pageRoutes = pages.map((p) => ({
      loc: `/${p.slug}`,
      changefreq: 'weekly',
      priority: 0.7,
    }))

    const solutionRoutes = solutions.map((s) => ({
      loc: `/solutions/${s.slug}`,
      changefreq: 'weekly',
      priority: 0.7,
    }))

    return [
      await config.transform(config, '/'),
      ...pageRoutes,
      ...solutionRoutes,
    ]
  },
}