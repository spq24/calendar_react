class AppointmentsController < ApplicationController

    def create
        @appointment = Appointment.new(appointment_params)

        if @appointment.save
            render json: @appointment
        else
            render json: @appointment.errors, status: :unprocessable_entity
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
