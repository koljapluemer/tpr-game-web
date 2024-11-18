export function useDragAndDrop(moveCard: (fromX: number, fromY: number, toX: number, toY: number) => void) {
    function onDragStart(event: DragEvent, fromX: number, fromY: number) {
      event.dataTransfer?.setData("from", JSON.stringify({ fromX, fromY }));
    }
  
    function onDrop(event: DragEvent, toX: number, toY: number) {
      const fromData = event.dataTransfer?.getData("from");
      if (fromData) {
        const { fromX, fromY } = JSON.parse(fromData);
        moveCard(fromX, fromY, toX, toY);
      }
    }
  
    function onDragOver(event: DragEvent) {
      event.preventDefault();
    }
  
    return { onDragStart, onDrop, onDragOver };
  }
  