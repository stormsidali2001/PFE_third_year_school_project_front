import HorisontalNavbar from "../../components/HorisontalNavbar";
import AdminVerticalNavbar from "../../components/AdminVerticalNavbar";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useStoreActions, useStoreState } from "../../store/hooks";
import { useRouter } from "next/router";

export default function Listesoutenance() {
  const router = useRouter();
  const { promotion } = router.query;

  const { getSoutenances } = useStoreActions((store) => store.soutenanceModel);
  const { soutenances } = useStoreState((store) => store.soutenanceModel);
  const { promotions } = useStoreState((store) => store.promotionsModel);
  const { getAllPromotionsThunk } = useStoreActions(
    (store) => store.promotionsModel
  );
  const [chosenPromotion, setChosenPromotion] = useState(null);

  useEffect(() => {
    const load = async () => {
      if (promotions?.length === 0) await getAllPromotionsThunk();

      if (!promotion || promotion?.length === 0) {
        promotions?.length > 0 && (await getSoutenances());
        return;
      }
      const label = promotions.find((el) => el.id === promotion)?.name;
      if (!label) return;

      setChosenPromotion({ value: promotion, label });
      await getSoutenances(promotion);
    };

    load();
  }, [promotion, promotions]);

  const handleOption = (option) => {
    router.push(`/soutenances?promotion=${option.value}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (milliseconds) => {
    if (!milliseconds) return 'N/A';
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="min-h-screen bg-background w-full flex flex-col">
      <HorisontalNavbar />
      <AdminVerticalNavbar />

      <div className="pt-32 sm:pl-32 px-8 text-textcolor flex flex-col items-center space-y-12 pb-16">
        <h1 className="text-4xl font-semibold tracking-wide" style={{ color: '#000000' }}>Liste des soutenances</h1>

        {/* Promotion Selector */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <span className="text-lg hidden md:block font-medium" style={{ color: '#000000' }}>Choisir une promotion :</span>
          <div className="w-full md:w-64">
            <Select
              placeholder="Choisir une promotion..."
              onChange={handleOption}
              options={promotions.map((el) => ({ value: el.id, label: el.name }))}
              value={chosenPromotion}
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: '#E5E7EB',
                  borderRadius: '0.75rem',
                  boxShadow: 'none'
                })
              }}
            />
          </div>
        </div>

        {/* Soutenances Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
          {soutenances.map((el) => (
            <div
              key={el.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200 cursor-pointer flex flex-col"
              onClick={() => router.push(`/soutenances/${el.id}`)}
            >
              <div className="p-5 flex flex-col space-y-2">
                <h2 className="text-lg font-bold line-clamp-2" style={{ color: '#000000' }}>{el.title}</h2>
                
                <div style={{ color: '#000000' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#5375E2' }}>ÉQUIPE</p>
                  <p className="text-sm">#{el.team.nickName}</p>
                </div>

                <div style={{ color: '#000000' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#5375E2' }}>DESCRIPTION</p>
                  <p className="text-sm line-clamp-2">{el.description}</p>
                </div>

                <div style={{ color: '#000000' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#5375E2' }}>DATE</p>
                  <p className="text-sm">{formatDate(el.date)}</p>
                </div>

                <div style={{ color: '#000000' }}>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: '#5375E2' }}>DURÉE</p>
                  <p className="text-sm">{formatDuration(el.duration)}</p>
                </div>
              </div>

              <div className="px-5 py-3 mt-auto border-t border-gray-100">
                <button
                  className="w-full py-2 rounded-lg font-semibold text-white text-sm"
                  style={{ backgroundColor: '#5375E2' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/soutenances/${el.id}`);
                  }}
                >
                  Voir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
