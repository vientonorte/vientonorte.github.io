"""Validate projects.json manifest integrity and auto-stats contract."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTS_PATH = ROOT / "data" / "projects.json"


def load_projects() -> dict:
    with PROJECTS_PATH.open(encoding="utf-8") as handle:
        return json.load(handle)


def count_badges(projects: list[dict]) -> dict[str, int]:
    counts = {"live": 0, "private": 0, "repo": 0, "deprecated": 0}
    for project in projects:
        badge = project.get("badge")
        assert badge in counts, f"unknown badge: {badge}"
        counts[badge] += 1
    return counts


def test_projects_file_exists() -> None:
    assert PROJECTS_PATH.is_file()


def test_projects_has_required_meta() -> None:
    data = load_projects()
    assert "meta" in data
    assert "name" in data["meta"]
    assert "role" in data["meta"]
    assert "contact" in data["meta"]
    assert isinstance(data["projects"], list)
    assert len(data["projects"]) >= 1


def test_live_projects_include_aruma_and_uxtools() -> None:
    data = load_projects()
    by_id = {p["id"]: p for p in data["projects"]}
    assert by_id["aruma"]["badge"] == "live"
    assert by_id["uxtools"]["badge"] == "live"
    aruma_links = [link["href"] for link in by_id["aruma"]["links"]]
    assert "https://vientonorte.github.io/aruma/" in aruma_links


def test_stats_not_hardcoded_when_absent() -> None:
    """Stats are computed client-side; meta.stats is optional."""
    data = load_projects()
    stats = data["meta"].get("stats")
    if stats is None:
        return
    projects = data["projects"]
    counts = count_badges(projects)
    by_dot = {item["dot"]: item["value"] for item in stats}
    assert by_dot.get("live") == str(counts["live"])
    assert by_dot.get("private") == str(counts["private"])
    assert by_dot.get("off") == str(counts["repo"])
    assert by_dot.get("deprecated") == str(counts["deprecated"])


def test_highlights_bilingual_when_present() -> None:
    data = load_projects()
    highlights = data["meta"].get("highlights")
    if not highlights:
        return
    for item in highlights:
        assert "es" in item and "en" in item
        assert item["es"].strip()
        assert item["en"].strip()
