class AppointmentsController < ApplicationController

    def create
        @appointment = Appointment.create(appointment_params)
        @appointments = Appointment.order('time ASC')

        if @appointment.save
            render json: @appointment
        else
            render json: @appointment.errors, status: :unprocessible
        end
    end

    def index
        @appointment = Appointment.new
        @appointments = Appointment.order('time ASC')
    end

    private

        def appointment_params
            params.require(:appointment).permit(:name, :time)
        end

end
