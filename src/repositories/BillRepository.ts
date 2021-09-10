import { BillModel } from '../models/BillModel';
import { MenuModel } from '../models/MenuModel';

export class BillClass {

    /**
     * Generate bill for created order
     * Uses GenerateTotal() to create total bill amount
     */
    async generateBill(id: string, items: any) {

        var total = await this.GenerateTotal(items);
        var bill = {
            order_id: id,
            items: items,
            total_price: total
        };

        return await new BillModel(bill).save();
    }
    private async GenerateTotal(items: any): Promise<number> {
        var total: number = 0;
        for (var i = 0; i < items.length; i++) {
            var item = await MenuModel.findById(items[i].item);
            var price: number = item ? item.price : 0;
            var qty = items[i].quantity;
            total += (price * qty);
        }
        return total;
    }
}