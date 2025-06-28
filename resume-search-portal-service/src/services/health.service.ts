class HealthService {
  public async getHealth(): Promise<
    Required<{
      data: any;
      message: string;
    }>
  > {
    const payload = {
      time: new Date().toDateString(),
      status: "Working",
      error: false,
    };
    return {
      data: payload,
      message: `The Health of the Backend Services is Fetches`,
    };
  }
}

const getHealthServiceInstance = (): HealthService => {
  return new HealthService();
};

export { getHealthServiceInstance, HealthService };
