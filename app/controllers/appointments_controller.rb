class AppointmentsController < ApplicationController
    before_action :set_appointment, only: [:edit, :update, :show, :destroy]

    def create
        @appointment = current_user.appointments.new(appointment_params)

        if @appointment.save
            render json: @appointment
        else
            render json: @appointment.errors, status: :unprocessable_entity
        end
    end

    def show
        render json: @appointment
    end

    def edit
        render :index
    end

    def update
        if @appointment.update(appointment_params)
            render json: @appointment
        else
            render json: @appointment.errors, status: :unprocessable_entity
        end
    end

    def index
        @appointment = current_user.appointments.new
        @appointments = current_user.appointments.order('time ASC')
        render json: @appointments
    end


    def destroy
        if @appointment.destroy
            head :no_content, status: :ok
        else
            render json: @appointment.errors, status: :unprocessable_entity
        end
    end

    private

        def appointment_params
            params.require(:appointment).permit(:name, :time)
        end

        def set_appointment
            @appointment = current_user.appointments.find(params[:id])
        end

end
