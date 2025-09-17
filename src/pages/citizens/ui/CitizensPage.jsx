import { Card } from "@/shared/ui";
import { CitizensTable } from "@/widgets/citizens-table";
import { CitizenCard } from "@/features/citizen";
import { useCitizens } from "@/widgets/citizens-table";

export const CitizensPage = () => {
  const { selectedCitizen } = useCitizens();

  return (
    <div className="space-y-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Картотека граждан</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <CitizensTable />
          </Card>

          <Card className="overflow-hidden">
            <div className="lg:h-[80vh] overflow-auto p-2">
              {selectedCitizen ? (
                <CitizenCard citizen={selectedCitizen} />
              ) : (
                <div className="text-gray-500">
                  Выберите гражданина слева для просмотра карточки
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
