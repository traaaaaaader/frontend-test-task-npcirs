import { Card } from "@/shared/ui";
import { CitizensTable } from "@/widgets/citizens-table";
import { CitizenCard } from "@/features/citizen";
import { useCitizens } from "@/widgets/citizens-table";
export const CitizensPage = () => {
  const { selectedCitizen } = useCitizens();

  return (
    <div className="flex flex-col flex-1 overflow-hidden max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold my-4">Картотека граждан</h1>

      <div className="flex flex-col lg:flex-row gap-6 overflow-hidden">
        <Card className="flex flex-col flex-1 overflow-hidden">
          <CitizensTable />
        </Card>

        <Card className="flex-1 overflow-auto">
          <div className="overflow-auto p-2">
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
  );
};
