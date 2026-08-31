export interface NearEarthObject {
    id: string;
    name: string;
    is_potentially_hazardous_asteroid: boolean;
    estimated_diameter: {
      feet: {
        estimated_diameter_min: number;
        estimated_diameter_max: number;
      };
    };
    close_approach_data: {
      relative_velocity: {
        miles_per_hour: string;
      };
      miss_distance: {
        miles: string;
      };
    }[];
  }