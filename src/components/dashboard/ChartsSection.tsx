
import ChartComponent from '@/components/ChartComponent';

interface ChartData {
  name: string;
  value: number;
}

interface ChartsSectionProps {
  loanApplicationData: ChartData[];
  totalProcessingData: ChartData[];
  rejectionReasonsData: ChartData[];
}

const ChartsSection = ({
  loanApplicationData,
  totalProcessingData,
  rejectionReasonsData
}: ChartsSectionProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
      <div className="xl:col-span-3">
        <ChartComponent 
          title="Loan Applications (Monthly)" 
          data={loanApplicationData} 
          type="area" 
          color="#24a950" 
        />
      </div>
      <div className="xl:col-span-1">
        <ChartComponent 
          title="Number of Applications (Monthly)" 
          data={totalProcessingData} 
          type="bar" 
          color="#3498DB" 
        />
      </div>
      <div className="xl:col-span-2">
        <ChartComponent 
          title="Rejection Reasons (Monthly)" 
          data={rejectionReasonsData} 
          type="bar" 
          color="#E74C3C" 
        />
      </div>
    </div>
  );
};

export default ChartsSection;
