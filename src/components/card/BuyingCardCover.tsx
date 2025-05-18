import { EditOutlined, DeleteOutlined, CheckOutlined} from '@ant-design/icons';
import { Button } from 'antd';

interface CardCoverProps {
  children: React.ReactNode
  onUpdate: () => void
  onDelete: () => void
  status: boolean
}

export function BuyingCardCover({ children , onUpdate, onDelete, status }: CardCoverProps) {
  return (
    <div className="flex flex-row gap-4 h-32 items-center justify-center">
      {children}
      <div className="flex flex-col gap-2">
        {status ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-xs text-center">ส่งหลัง</div>
            <Button
              icon={<CheckOutlined />}
              size="small"
              className="w-[35px]W bg-[#e0e0e0] border-none hover:bg-green-500 transition-colors"
              onClick={onUpdate}
            />
            <Button 
              danger
              icon={<DeleteOutlined />}
              style={{ width: 35 }}
              size="small"
              onClick={onDelete}
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-xs text-center">ส่งหลัง</div>
            <Button 
              disabled
              style={{ width: 35, backgroundColor: '#e0e0e0', border: 'none' }}
              size="small"
            />
            <Button 
              icon={<EditOutlined />}
              style={{ width: 35 }}
              size="small"
              onClick={onUpdate}
            />
            <Button 
              danger
              icon={<DeleteOutlined />}
              style={{ width: 35 }}
              size="small"
              onClick={onDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
