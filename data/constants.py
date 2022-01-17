from pathlib import Path
from typing import Dict

# RAW_DATA: str = "data_2021_main_dvs-soti_v1.csv"
RAW_DATA: str = "data_2021_main_dvs-soti_v1.1.csv"
TOOL_COUNTS_DATA: str = "tools_counts"
FE_SRC_FOLDER: Path = Path("../") / "src"

TOOLS_COL_PREFIX: str = "ToolsForDV_"
TOOLS_OTHER_COL: str = f"{TOOLS_COL_PREFIX}Other__"
ID_COL: str = "chronID"

TOOL_COL: str = "tool"
USE_COL: str = "use_count"
NOT_USE_COL: str = "not_use_count"
TOTAL_COUNT_COL: str = "total_count"
RANK_COL: str = "ranking"

TOOLS_MAP: Dict[str, str] = {
    "D3": "D3.js",
    "GoogleDataStudio": "Google Data Studio",
    "KeplerGL": "kepler.gl",
    "PowerBI": "Power BI",
    "WebComponents": "Web Components",
    "PenPaper": "Pen & paper",
    "PhysicalMaterials": "Physical materials (other than pen and paper)",
    "P5orProcessing": "P5/Processing",
}
