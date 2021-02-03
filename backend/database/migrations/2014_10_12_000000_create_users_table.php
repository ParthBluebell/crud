<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname');
            $table->string('lastname');
            $table->string('email');
            $table->string('password');
            $table->string('userimage')->nullable();
            $table->date('birthdate');
            $table->string('department')->nullable();
            $table->enum('isPermanent',['Y','N'])->default('N')->comments("Y for Yes , N for No");
            $table->enum('gender',['M','F','O'])->default(NULL)->nullable()->comments("M for Male , F for Female , O for others");
            $table->enum('usertype',['U','A'])->default('U')->comments("A for Admin , U for User ");
            $table->enum('is_deleted',['Y','N'])->default('N')->comments("Y for Yes , N for No");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
