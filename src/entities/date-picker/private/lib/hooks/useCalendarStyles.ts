import buildClassName from '@/shared/lib/buildClassName';
import buildStyle from '@/shared/lib/buildStyle';
import { useMemo } from 'react';
import { ZoomLevel } from '../constans';

const useCalendarStyles = (
  className: string | undefined,
  zoomLevel: ZoomLevel,
  cellSize: number,
) => {
  const classNames = useMemo(
    () =>
      buildClassName(
        'dp-calendar-grid',
        `dp-${String(ZoomLevel[zoomLevel]).toLowerCase()}-view`,
        className,
      ),
    [zoomLevel],
  );

  const style = useMemo(() => buildStyle(`--cell-size: ${cellSize}px`), [cellSize]);

  return { classNames, style };
};

export default useCalendarStyles;
