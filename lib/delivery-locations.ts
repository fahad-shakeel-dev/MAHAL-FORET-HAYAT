export type DeliveryLocation = { name: string; address: string; kind: 'Delivery area' | 'Office' | 'Warehouse' | 'Company location' };
// Add confirmed company locations and delivery areas here. Do not invent coverage.
export const deliveryLocations: DeliveryLocation[] = [
  {
    name: 'MAHAL FORET HAYAT',
    address: '4929 Al Furusiyyah 7893 Al Muhammadiya Dist, DAMMAM 32433',
    kind: 'Company location',
  },
];
