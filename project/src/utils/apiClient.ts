const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    async generatePDF(itineraryData: any): Promise<Blob> {
        try {
            console.log('Sending PDF generation request to:', `${this.baseUrl}/generate-pdf`);
            console.log('Itinerary data:', JSON.stringify(itineraryData, null, 2));

            const response = await fetch(`${this.baseUrl}/generate-pdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf',
                },
                body: JSON.stringify(itineraryData),
            });

            if (!response.ok) {
                console.error('PDF generation failed with status:', response.status);
                const errorData = await response.json().catch(() => ({}));
                console.error('Error data:', errorData);
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            console.log('PDF generation successful, creating blob...');
            const blob = await response.blob();
            console.log('Blob created, size:', blob.size);
            return blob;
        } catch (error) {
            console.error('PDF generation failed:', error);
            throw new Error(
                error instanceof Error
                    ? `Failed to generate PDF: ${error.message}`
                    : 'Failed to generate PDF. Please check if the backend server is running and accessible.'
            );
        }
    }

    async healthCheck(): Promise<{ status: string; message: string }> {
        try {
            console.log('Fetching health check from:', `${this.baseUrl}/health`);
            const response = await fetch(`${this.baseUrl}/health`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Health check response status:', response.status);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Health check response data:', data);
            return data;
        } catch (error) {
            console.error('Health check failed:', error);
            throw new Error(
                error instanceof Error
                    ? `Backend server is not available: ${error.message}`
                    : 'Backend server is not available. Please ensure the server is running at ' + this.baseUrl
            );
        }
    }
}

export const apiClient = new ApiClient();


