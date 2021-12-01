# Data

## Development

- `pipenv install --python 3.6`.
- `pipenv shell`.
- `jupyter retro`.

## Notes

- `data_2021_main_dvs-soti_v1.csv`: raw data.
- [Polars](https://www.pola.rs/):
  - Alternative to pandas. DataFrame library written in Rust with a [Python API](https://pola-rs.github.io/polars/py-polars/html/reference/).
  - `pipenv install polars`.
  - [Documentation/Cookbook](https://pola-rs.github.io/polars-book/user-guide/index.html).
  - [Optimizations](https://pola-rs.github.io/polars-book/user-guide/optimizations/intro.html). Predicate pushdown for rows and projection pushdown for columns. [`.collect()`](https://pola-rs.github.io/polars/py-polars/html/reference/api/polars.LazyFrame.collect.html).
  - [Tutorial by calmcode](https://calmcode.io/polars/introduction.html):
    - In pandas, you have to be aware of the order in which operations occur (efficiency). pandas is not designed to look at all operations to be performed before running them (pandas runs steps in sequence). On the other hand, Polars comes with query optimizations and the code can be run in parallel.
    - Polars has a different (DataFrame) API than pandas. The API/syntax looks like a mix of pandas and PySpark.
    - `df = pl.read_csv("data.csv", parse_dates=False)` (eager mode).
    - `df = pl.scan_csv("data.csv")` + `df.fetch(5)`/`df.head(5).collect()` (lazy mode).
    - `dataf` as an alternative to `df`.
    - Polars also has a `.pipe()` method like pandas.
    - Use the [`.over()` method](https://pola-rs.github.io/polars/py-polars/html/reference/api/polars.Expr.over.html) instead of `groupby`s, `agg`s, and `join`s. This method must follow an aggregating expression (e.g., `.count()`).
  - To use the `.to_pandas()` method, install [PyArrow](https://arrow.apache.org/docs/python/index.html) and pandas.
- [RetroLab](https://github.com/jupyterlab/retrolab):
  - [RetroLab — A JupyterLab distribution with a retro look and feel](https://blog.jupyter.org/retrolab-a-jupyterlab-distribution-with-a-retro-look-and-feel-8096b8b223d0) blog post by Jeremy Tuloup:
    - Alternative JupyterLab distribution. It is similar to Jupyter Notebook.
    - New notebooks are opened in new browser tabs by default.
    - RetroLab has a Zen Mode (a kind of full-screen mode).
    - RetroLab has a more compact layout for mobile devices.
  - `pipenv install retrolab`.
  - Start: `jupyter retro` or `jupyter retro --retro-logo`.
  - Select lines and press `Control ⌃` + `-` to toggle line comments.
  - [Available string methods](https://pola-rs.github.io/polars/py-polars/html/search.html?q=StringNameSpace).
- Black:
  - It supports Jupyter notebooks now ([PR](https://github.com/psf/black/pull/2357)).
  - `pipenv install "black[jupyter]==21.11b1"`.
  - `black prep_tools_counts_polars.ipynb`.
