<?php
namespace App\Form;

use App\Entity\Group;
use App\Entity\Student;
use App\Entity\Submission;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SubmitForm extends AbstractType{

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('gitHubLink')
        ->add('fileUrl', FileType::class, [
            'label' => 'Document (draft version)',
            'mapped' => false,
            'required' => false])
         ;
    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Submission::class
        ]);
    }
}

?>