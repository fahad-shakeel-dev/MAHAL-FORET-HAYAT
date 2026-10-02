export type DeliveryLocation = { name: string; address: string; kind: 'Delivery area' | 'Office' | 'Warehouse' };
// Add confirmed company locations and delivery areas here. Do not invent coverage.
export const deliveryLocations: DeliveryLocation[] = [];
