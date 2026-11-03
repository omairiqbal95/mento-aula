#!/usr/bin/env python3
"""Copy local V11.1 script into a hierarchy-enhanced variant, without rewriting credentials.

No source credentials are printed, uploaded, or included in this patch bundle.
"""
from pathlib import Path
import argparse
import ast
import shutil


def patch(source: Path, target: Path) -> None:
    if not source.exists():
        raise SystemExit(f'Cannot find original script: {source}')
    if source.resolve() == target.resolve():
        raise SystemExit('Refusing to overwrite original. Choose a different --output filename.')
    content=source.read_text(encoding='utf8')
    if 'class LoadNavigator(Exporter):' not in content:
        raise SystemExit('Incompatible source: expected V11.1 LoadNavigator subclass.')
    if 'class LoadScheduler:' not in content or 'async def v11_main()' not in content:
        raise SystemExit('Incompatible source: expected V11.1 scheduler and entrypoint.')
    marker="if __name__=='__main__':"
    if content.count(marker)!=1:
        raise SystemExit('Incompatible source entrypoint. Original left unchanged.')
    if '_mentoaula_hierarchical_install' in content:
        raise SystemExit('Source already appears patched. Original left unchanged.')
    injection=("\n# Hierarchical SCORM sidebar fix; uses the local helper module.\n"
               "from mentoaula_sidebar_hierarchy import install as _mentoaula_hierarchical_install\n"
               "_mentoaula_hierarchical_install(Exporter, LoadNavigator, globals())\n\n")
    updated=content.replace(marker,injection+marker)
    ast.parse(updated, filename=str(target))
    target.write_text(updated,encoding='utf8')
    print(f'Created: {target}')
    print('Original unchanged. Run the new script from the same folder as the helper module.')


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source',default='mentoaula_loadtest_v11_1.py')
    parser.add_argument('--output',default='mentoaula_loadtest_v11_1_hierarchy.py')
    args=parser.parse_args()
    source=Path(args.source)
    destination=Path(args.output)
    if not Path('mentoaula_sidebar_hierarchy.py').exists():
        raise SystemExit('Copy mentoaula_sidebar_hierarchy.py into the project folder first.')
    patch(source,destination)
if __name__=='__main__':main()
