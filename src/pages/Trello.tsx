import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrelloBoard, TrelloList, TrelloCard } from "@/types/trello";
import {
  Plus,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const Trello = () => {
  const [boards, setBoards] = useState<TrelloBoard[]>([]);
  const [selectedBoard, setSelectedBoard] = useState<TrelloBoard | null>(null);
  const [newBoardName, setNewBoardName] = useState("");
  const [newListName, setNewListName] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [isBoardDialogOpen, setIsBoardDialogOpen] = useState(false);
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [isCardDialogOpen, setIsCardDialogOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<TrelloList | null>(null);

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) {
      toast.error("El nombre del tablero no puede estar vacío");
      return;
    }

    const newBoard: TrelloBoard = {
      id: `board_${Date.now()}`,
      name: newBoardName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lists: [],
    };

    setBoards([...boards, newBoard]);
    setSelectedBoard(newBoard);
    setNewBoardName("");
    setIsBoardDialogOpen(false);
    toast.success(`Tablero "${newBoard.name}" creado exitosamente`);
  };

  const handleCreateList = () => {
    if (!selectedBoard || !newListName.trim()) {
      toast.error("El nombre de la lista no puede estar vacío");
      return;
    }

    const newList: TrelloList = {
      id: `list_${Date.now()}`,
      name: newListName,
      position: selectedBoard.lists.length,
      cards: [],
    };

    const updatedBoard = {
      ...selectedBoard,
      lists: [...selectedBoard.lists, newList],
    };

    setSelectedBoard(updatedBoard);
    setBoards(boards.map((b) => (b.id === selectedBoard.id ? updatedBoard : b)));
    setNewListName("");
    setIsListDialogOpen(false);
    toast.success(`Lista "${newList.name}" creada exitosamente`);
  };

  const handleCreateCard = () => {
    if (!selectedBoard || !selectedList || !newCardName.trim()) {
      toast.error("El nombre de la tarjeta no puede estar vacío");
      return;
    }

    const newCard: TrelloCard = {
      id: `card_${Date.now()}`,
      name: newCardName,
      position: selectedList.cards.length,
      labels: [],
      members: [],
      attachments: [],
      comments: [],
    };

    const updatedList = {
      ...selectedList,
      cards: [...selectedList.cards, newCard],
    };

    const updatedBoard = {
      ...selectedBoard,
      lists: selectedBoard.lists.map((l) => (l.id === selectedList.id ? updatedList : l)),
    };

    setSelectedBoard(updatedBoard);
    setSelectedList(updatedList);
    setBoards(boards.map((b) => (b.id === selectedBoard.id ? updatedBoard : b)));
    setNewCardName("");
    setIsCardDialogOpen(false);
    toast.success(`Tarjeta "${newCard.name}" creada exitosamente`);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Trello</h1>
          <p className="text-muted-foreground">Gestión de proyectos con tableros Kanban</p>
        </div>
        <Dialog open={isBoardDialogOpen} onOpenChange={setIsBoardDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Tablero
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Tablero</DialogTitle>
              <DialogDescription>
                Crea un nuevo tablero para organizar tus proyectos
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="boardName" className="text-sm font-medium">
                  Nombre del Tablero
                </label>
                <Input
                  id="boardName"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="Mi Proyecto"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateBoard();
                    }
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsBoardDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateBoard}>Crear</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {boards.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No hay tableros creados. Crea tu primer tablero para comenzar.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {!selectedBoard ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {boards.map((board) => (
                <Card
                  key={board.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedBoard(board)}
                >
                  <CardHeader>
                    <CardTitle>{board.name}</CardTitle>
                    <CardDescription>
                      {board.lists.length} lista(s) • {board.lists.reduce((acc, list) => acc + list.cards.length, 0)} tarjeta(s)
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedBoard.name}</h2>
                  <p className="text-muted-foreground">
                    {selectedBoard.lists.length} lista(s)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedBoard(null)}
                  >
                    Volver a Tableros
                  </Button>
                  <Dialog open={isListDialogOpen} onOpenChange={setIsListDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva Lista
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Crear Nueva Lista</DialogTitle>
                        <DialogDescription>
                          Agrega una nueva columna a tu tablero
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="listName" className="text-sm font-medium">
                            Nombre de la Lista
                          </label>
                          <Input
                            id="listName"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="Por hacer"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleCreateList();
                              }
                            }}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsListDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleCreateList}>Crear</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4">
                {selectedBoard.lists.map((list) => (
                  <Card key={list.id} className="min-w-[300px] flex-shrink-0">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{list.name}</CardTitle>
                      <CardDescription>{list.cards.length} tarjeta(s)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {list.cards.map((card) => (
                        <Card
                          key={card.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-3">
                            <p className="text-sm font-medium">{card.name}</p>
                            {card.description && (
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {card.description}
                              </p>
                            )}
                            {card.dueDate && (
                              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(card.dueDate), "PPP", { locale: es })}
                              </div>
                            )}
                            {card.labels.length > 0 && (
                              <div className="flex gap-1 mt-2 flex-wrap">
                                {card.labels.map((label) => (
                                  <Badge
                                    key={label.id}
                                    variant="outline"
                                    style={{ borderColor: label.color }}
                                  >
                                    {label.name}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                      <Dialog open={isCardDialogOpen && selectedList?.id === list.id} onOpenChange={(open) => {
                        setIsCardDialogOpen(open);
                        if (open) {
                          setSelectedList(list);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-muted-foreground"
                            onClick={() => setSelectedList(list)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Agregar tarjeta
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Crear Nueva Tarjeta</DialogTitle>
                            <DialogDescription>
                              Agrega una nueva tarjeta a "{list.name}"
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label htmlFor="cardName" className="text-sm font-medium">
                                Nombre de la Tarjeta
                              </label>
                              <Input
                                id="cardName"
                                value={newCardName}
                                onChange={(e) => setNewCardName(e.target.value)}
                                placeholder="Nueva tarea"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleCreateCard();
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCardDialogOpen(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={handleCreateCard}>Crear</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Trello;

